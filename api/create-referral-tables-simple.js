const mysql = require('mysql2');
require('dotenv').config();

async function createReferralTablesSimple() {
  console.log('🔧 Creating referral system database tables (without foreign keys)...\n');

  try {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    });

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Database connection successful');

    // Check if schools table exists
    console.log('Checking schools table...');
    const [schoolsTable] = await connection.promise().query("SHOW TABLES LIKE 'schools'");
    if (schoolsTable.length === 0) {
      console.log('⚠️  Schools table not found. Creating without foreign key constraints.');
    } else {
      console.log('✅ Schools table exists');
    }

    // Create referral_codes table (without foreign key)
    console.log('Creating referral_codes table...');
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS referral_codes (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        school_id INT NOT NULL,
        referral_code VARCHAR(20) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_referral_code (referral_code),
        INDEX idx_school_id (school_id)
      )
    `);
    console.log('✅ referral_codes table created');

    // Create referral_tracking table (without foreign keys)
    console.log('Creating referral_tracking table...');
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS referral_tracking (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        referrer_school_id INT NOT NULL,
        referred_school_id INT NOT NULL,
        referral_code_used VARCHAR(20) NOT NULL,
        referral_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
        discount_applied DECIMAL(10,2) DEFAULT 0.00,
        discount_percentage DECIMAL(5,2) DEFAULT 0.00,
        reward_amount DECIMAL(10,2) DEFAULT 0.00,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_referrer_school (referrer_school_id),
        INDEX idx_referred_school (referred_school_id),
        INDEX idx_referral_code_used (referral_code_used),
        INDEX idx_status (status)
      )
    `);
    console.log('✅ referral_tracking table created');

    // Create referral_analytics table (without foreign key)
    console.log('Creating referral_analytics table...');
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS referral_analytics (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        school_id INT NOT NULL,
        total_referrals INT DEFAULT 0,
        successful_referrals INT DEFAULT 0,
        total_rewards_earned DECIMAL(10,2) DEFAULT 0.00,
        total_discounts_given DECIMAL(10,2) DEFAULT 0.00,
        last_referral_date TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_school_analytics (school_id)
      )
    `);
    console.log('✅ referral_analytics table created');

    // Create referral_rewards table (without foreign keys)
    console.log('Creating referral_rewards table...');
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS referral_rewards (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        school_id INT NOT NULL,
        referral_tracking_id CHAR(36) NOT NULL,
        reward_type ENUM('discount', 'credit', 'subscription_extension') NOT NULL,
        reward_amount DECIMAL(10,2) NOT NULL,
        reward_status ENUM('pending', 'applied', 'expired') DEFAULT 'pending',
        applied_at TIMESTAMP NULL,
        expires_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_school_id (school_id),
        INDEX idx_reward_status (reward_status)
      )
    `);
    console.log('✅ referral_rewards table created');

    // Create referral_settings table
    console.log('Creating referral_settings table...');
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS referral_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ referral_settings table created');

    // Insert default settings
    console.log('Inserting default settings...');
    await connection.promise().query(`
      INSERT INTO referral_settings (setting_key, setting_value, description) VALUES
      ('referral_discount_percentage', '10.00', 'Default discount percentage for referred schools'),
      ('referral_reward_amount', '50.00', 'Default reward amount for referrer schools'),
      ('referral_code_length', '8', 'Length of generated referral codes'),
      ('referral_expiry_days', '365', 'Number of days referral codes remain valid'),
      ('max_referrals_per_school', '100', 'Maximum number of referrals allowed per school'),
      ('min_subscription_amount', '100.00', 'Minimum subscription amount to qualify for referral rewards')
      ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    `);
    console.log('✅ Default settings inserted');

    // Verify tables
    console.log('\n🔍 Verifying table creation...');
    const tables = ['referral_codes', 'referral_tracking', 'referral_analytics', 'referral_rewards', 'referral_settings'];
    
    for (const table of tables) {
      const [rows] = await connection.promise().query(`SHOW TABLES LIKE '${table}'`);
      if (rows.length > 0) {
        console.log(`✅ Table '${table}' exists`);
      } else {
        console.log(`❌ Table '${table}' missing`);
      }
    }

    // Test the API functions
    console.log('\n🧪 Testing API functions...');
    try {
      const { getReferralSettings } = require('./model/apiModel.js');
      const settings = await getReferralSettings();
      console.log('✅ API functions working:', Object.keys(settings).length, 'settings loaded');
    } catch (error) {
      console.log('⚠️  API functions test failed:', error.message);
    }

    connection.end();
    console.log('\n🎉 Referral system database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the API server: npm start');
    console.log('2. Test the referral endpoints');
    console.log('3. Start the client application');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your database connection settings in .env');
    console.log('2. Ensure MySQL server is running');
    console.log('3. Verify database credentials');
  }
}

createReferralTablesSimple();
