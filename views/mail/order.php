<?php
/**
 * Created by PhpStorm.
 * User: dmitry
 * Date: 4/19/15
 * Time: 3:34 PM
 */


use yii\helpers\Html;
use	yii\helpers\Url;

echo Html::a('Ссылка на заказ', Url::toRoute(array('site/view', 'guid'=>$order->guid)));
