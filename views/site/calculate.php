<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
?>

<div class="pontoon-form">
	<h3>Рассчитать стоимость</h3>
	<?php $form = ActiveForm::begin([
		'id' => 'login-form',
		'options' => ['class' => 'form-horizontal'],
		'fieldConfig' => [
			'template' => "{input}\n{error}",
			'errorOptions' => ['tag' => 'div', 'class' => 'error' ]
		],
	]); ?>
	<?=$form->field($model, 'data')->hiddenInput()->label(false) ?>
	<?=$form->field($model, 'count')->hiddenInput()->label(false) ?>

	<div class="col-left">
		<?=$form->field($model, 'customer', ['inputOptions'=> ['placeholder'=>'Ваше имя']]) ?>
	</div>
	<div class="col-right">
		<?=$form->field($model, 'contact', ['inputOptions'=> ['placeholder'=>'E-mail или телефон']]) ?>
		<?php if ($model->getOrder() === null): ?>
			<button class="btn magicfloat-send-order">Отправить запрос</button>
		<?php endif; ?>
	</div>
	<?php ActiveForm::end(); ?>

	<div class="clear"></div>
	<?php if ($model->hasErrors()): ?>
		<div class="pontoon-form-feedback fail">При отправке запроса произошла ошибка. Пожалуйста, исправте подсвеченные ошибки.</div>
	<?php elseif ($model->getOrder() !== null): ?>
		<div class="pontoon-form-feedback">Запрос отправлен. Наш менеджер свяжется с Вами в течение 3-х дней.</div>
	<?php endif; ?>
</div>
<div class="pontoon-resume">
	<h3>Список материалов</h3>
	<div class="pontoon-list">
		<table>
			<?php $count = json_decode($model->count); ?>
			<?php foreach ($count as $type => $cnt): ?>
			<tr>
				<td class="col-name">
					<span><?=\app\controllers\SiteController::$description[$type]?></span>
				</td>
				<td class="col-count">
					<span><?=$cnt?> ед.</span>
				</td>
			</tr>
			<?php endforeach;?>
		</table>
	</div>
</div>