<?php
/* @var $this yii\web\View */
$this->title = 'MagicFloat.ru';
?>
<div class="pontoon-editer">
	<div class="pontoon-toolbar">
		<div class="box box-products">
			<label>Добавить</label>
			<a href="#" class="btn pushed" data-bar="pontons">Понтоны <i class="arrow"></i></a>
			<a href="#" class="btn">Фурнитура <i class="arrow"></i></a>
		</div>
		<div class="box">
			<label>Удалить</label>
			<a href="#" class="btn btn-clean eraser-tool"><span></span></a>
		</div>
		<div class="box pull-right">
			<label>Вид</label>

			<div class="btn-switcher magicfloat-view-mode">
				<a href="#" class="btn on" data-value="2D">2D</a>
				<a href="#" class="btn off" data-value="3D">3D</a>
			</div>

		    <a href="#" class="btn">Вход для дилеров</a>
        	<!--
			<div class="select" >
				<div class="fake-select">
					<span>1-й уровень блоков</span>
					<i class="arrow"></i>
				</div>
				<select name="level" class="level-select">
					<option value=1>1-й уровень блоков</option>
					<option value=2>2-й уровень блоков</option>
					<option value=3>3-й уровень блоков</option>
				</select>
			</div>
			-->
		</div>
	</div>
	<div class="pontoon-working-area">
		<div class="pontoon-zoomer">

			<a href="#" class="plus"></a>
			<a href="#" class="minus"></a>
		</div>
		<div class="pontoon-canvas">
			<canvas id="myCanvas" width="100%" height="100%"></canvas>
		</div>
		<div class="pontoon-sidebar" data-bar="pontons">
			<div class="pontoon-inner">
				<ul class="magicfloat-element-type">
					<li>
						<a href="#" class='tool' data-type="sb_105">
							<i class="pontoon-color-panel">
								<i class="pontoon-color selected-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#4b86fc;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#a9b6c2;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#333;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#ff7853;"></i>
								</i>
							</i>
							<img alt="" src="/img/p/sb_105_blue_3d.png"/>
							<span>Сегмент базовый<br/>SB-105</span>
						</a>
					</li>
					<li>
						<a href="#" class='tool' data-type='se_105'>
							<i class="pontoon-color-panel">
								<i class="pontoon-color selected-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#4b86fc;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#a9b6c2;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#333;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#ff7853;"></i>
								</i>
							</i>
							<img alt="" src="/img/p/se_105_blue_3d.png"/>
							<span>СЕГМЕНТ HALF FLOAT<br/>SE-105</span>
						</a>
					</li>
					<li >
						<a href="#" class='tool' data-type='sd_101'>
							<i class="pontoon-color-panel">
								<i class="pontoon-color selected-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#4b86fc;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#a9b6c2;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#333;"></i>
								</i>
								<i class="pontoon-color">
									<i class="pontoon-color-frame"></i>
									<i class="pontoon-color" style="background-color:#ff7853;"></i>
								</i>
							</i>
							<img alt="" src="/img/p/sd_101_blue_3d.png"/>
							<span>СЕГМЕНТ HALF FLOAT<br/>SE-105</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="pontoon-buttons">
		<div class="main-btn">
			<a href="<?=yii\helpers\Url::toRoute('site/calculate')?>" class="btn magicfloat-calculate">Показать расчет</a>
		</div>

		<a href="#" class="btn magicfloat-reset">Очистить</a>
		<a href="#" class="btn magicfloat-save">Сохранить</a>
	</div>
</div>
