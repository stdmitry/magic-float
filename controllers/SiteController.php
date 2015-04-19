<?php

namespace app\controllers;

use app\models\Order;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\OrderForm;
use app\models\ContactForm;

class SiteController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex() {
        return $this->render('index');
    }


	static public $description = [
		'sa_401' => 'SA-401 Шайба-прокладка Пластиковая',
		'sa_402' => 'SA-402 Винт Фиксирующий с гайкой пластиковый',
		'sa_202' => 'SA-202 Штифт Соединительный Коророткий Пластиковый',
		'sb_105' => 'SB-105 Сегмент Базовый Magic-Float II',
		'se_105' => 'SE-105 Сегмент Magic-Float Half Float',
	];

	public function actionCalculate() {
		$this->layout = 'popup';
		$model = new OrderForm();
		$model->data = $_POST['data'];
		$model->count = $_POST['count'];

		return $this->render('calculate', [
			'model' => $model,
		]);
	}

	public function actionOrder() {
		$model = new OrderForm();
		$model->load($_POST);
		if ($model->validate() && $model->save()) {
			Yii::$app->mailer->compose()
				->setFrom('info@magicfloat.ru')
				->setTo($model->contact)
				->setSubject('MagicFloat: Заказ')
				->setHtmlBody($this->renderPartial('/mail/order', ['order'=>$model->getOrder()]))
				->send();
		}

		$this->layout = 'popup';
		return $this->render('calculate', [
			'model' => $model
		]);

	}

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    public function actionAbout()
    {
        return $this->render('about');
    }
}
