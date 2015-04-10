<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
	<title>Редактор</title>
	<meta name="viewport" content="width=device-width, minimum-scale=1.0" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css' />
	<link rel="stylesheet" type="text/css" href="/css/style.css" />
	<!--[if lt IE 9]>
	<style>
		.pontoon-zoomer a.plus {background-image:url(/img/ie/icon-plus.png);}
		.pontoon-zoomer a.minus {background-image:url(/img/ie/icon-minus.png);}
		.pontoon-editer .btn .arrow, .pontoon-editer .select .fake-select .arrow {background-image:url(/img/ie/arrow.png);}
		.pontoon-overlay .pontoon-form .row input {padding-top:9px;}
		.pontoon-overlay .btn-close {background-image:url(/img/ie/close.png);}
		.pontoon-color-panel .pontoon-color .pontoon-color-frame {background-image:url(/img/ie/color-frame.png);}
	</style>
	<![endif]-->
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="/css/styleIEOld.css" />
	<![endif]-->

    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body onload="onload()">
<!--[if lt IE 8]><div class="support">Sorry, we don't support this version of Internet Explorer.<br/><a href="http://windows.microsoft.com/en-US/internet-explorer/download-ie">Please, update your browser</a> or use another.</div><![endif]-->

<?php $this->beginBody() ?>
<?= $content ?>
<?php $this->endBody() ?>

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="/js/jquery.mousewheel.min.js"></script>
<script src="/js/jquery.storageapi.min.js"></script>
<script src="/js/interaction.js" type="text/javascript"></script>
<script src="/js/fabricjs_viewport.js" type="text/javascript"></script>

<script type="text/javascript">
	$(function () {
		/* non-standart dropdown lists */
		$(".select select").each(function () {
			var txt = $("option:selected", $(this)).text();
			$(this).parent().find("span").html(txt);
		});
		$(".select select").change(function () {
			var txt = $("option:selected", $(this)).text();
			$(this).parent().find("span").html(txt);
		});
		/* non-standart dropdown lists */

		/* overlay closing */
		$(".pontoon-overlay .btn-close").click(function () {
			$(this).parents(".pontoon-overlay").fadeOut();
		});
	});

	function onload() {
		Application().run();
	}
</script>
<script src="/js/Stuff.js" type="text/javascript"></script>
<script src="/js/Event.js" type="text/javascript"></script>
<script src="/js/Mount.js" type="text/javascript"></script>
<script src="/js/Item.js" type="text/javascript"></script>
<script src="/js/Model.js" type="text/javascript"></script>
<script src="/js/Drawer.js" type="text/javascript"></script>
<script src="/js/Drawer3D.js" type="text/javascript"></script>
<script src="/js/Tools.js" type="text/javascript"></script>
<script src="/js/Grid.js" type="text/javascript"></script>
<script src="/js/StorageMan.js" type="text/javascript"></script>
<script src="/js/Controller.js" type="text/javascript"></script>
<script src="/js/Popup.js" type="text/javascript"></script>
<script src="/js/Application.js" type="text/javascript"></script>

</body>
</html>
<?php $this->endPage() ?>
