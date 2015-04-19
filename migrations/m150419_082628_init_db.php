<?php

use yii\db\Schema;
use yii\db\Migration;

class m150419_082628_init_db extends Migration
{
	// Use safeUp/safeDown to run migration code within a transaction
	public function safeUp() {
		$this->createTable('{{users}}', array(
			'id' => 'pk',
			'name' => 'text',
			'password' => 'text'
		));

		$this->createTable('{{orders}}', array(
			'id' => 'pk',
			'guid' => 'char(36)',
			'customer' => 'text',
			'contact' => 'text',
			'data' => 'text',
		));
	}

	public function safeDown() {
		$this->dropTable('{{users}}');
		$this->dropTable('{{orders}}');
	}
}
