<div class="pontoon-form">
	<h3>Рассчитать стоимость</h3>
	<div class="col-left">
		<div class="row has-error">
			<input type="text" placeholder="Ваше имя" />
			<div class="error">Укажите Ваше имя.</div>
		</div>
		<div class="row partners-only">
			<input type="text" placeholder="Код" />
		</div>
		<div class="hint">Только для дилеров</div>
	</div>
	<div class="col-right">
		<div class="row">
			<input type="text" placeholder="E-mail или телефон" />
		</div>
		<button class="btn">Отправить запрос</button>
	</div>
	<div class="clear"></div>
	<div class="pontoon-form-feedback">Запрос отправлен. Наш менеджер свяжется с Вами в течение 3-х дней.</div>
	<div class="pontoon-form-feedback fail" style="display:block;">При отправке запроса произошла ошибка. Пожалуйста, <a href="">повторите попытку</a>.</div>
</div>
<div class="pontoon-resume">
	<h3>Список материалов</h3>
	<div class="pontoon-list">
		<table>
			<?php foreach ($items as $type => $cnt): ?>
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