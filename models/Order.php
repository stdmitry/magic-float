<?php

namespace app\models;

class Order extends \yii\db\ActiveRecord {
	public static function tableName() {
		return '{{orders}}';
	}
}
