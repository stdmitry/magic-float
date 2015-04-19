<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\db\Expression;

/**
 * LoginForm is the model behind the login form.
 */
class OrderForm extends Model {
    public $customer;
    public $contact;
	public $data;
	public $count;

	private $_order = null;

    public function rules() {
        return [
            [['customer'], 'required', 'message'=>'Укажите Ваше имя'],
			[['contact'], 'required', 'message'=>'Укажите Ваши контактные данные'],
            [['data', 'count'], 'safe'],

        ];
    }

	public function save() {
		$order = new Order();
		$order->customer = $this->customer;
		$order->contact = $this->contact;
		$order->data = $this->data;
		$order->guid = new Expression('uuid()');

		$result =  $order->save();
		$this->_order = $order;
		return $result;
	}

	public function getOrder() {
		return $this->_order;
	}
}
