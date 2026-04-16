import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import InventoryItem from './models/InventoryItem.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await InventoryItem.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: 'admin123',
      role: 'admin',
      emailVerified: true
    });

    // Create sample user
    const sampleUser = await User.create({
      name: 'Sample User',
      email: 'user@example.com',
      passwordHash: 'user123',
      role: 'user',
      emailVerified: true
    });

    // Create pizza bases
    const bases = await InventoryItem.insertMany([
      {
        category: 'base',
        name: 'Thin Crust',
        price: 150,
        stock: 100,
        threshold: 20
      },
      {
        category: 'base',
        name: 'Thick Crust',
        price: 160,
        stock: 100,
        threshold: 20
      },
      {
        category: 'base',
        name: 'Cheese Burst',
        price: 200,
        stock: 80,
        threshold: 15
      },
      {
        category: 'base',
        name: 'Whole Wheat',
        price: 170,
        stock: 90,
        threshold: 18
      },
      {
        category: 'base',
        name: 'Stuffed Crust',
        price: 220,
        stock: 70,
        threshold: 10
      }
    ]);

    // Create sauces
    const sauces = await InventoryItem.insertMany([
      {
        category: 'sauce',
        name: 'Tomato Basil',
        price: 30,
        stock: 200,
        threshold: 30
      },
      {
        category: 'sauce',
        name: 'BBQ Sauce',
        price: 40,
        stock: 150,
        threshold: 25
      },
      {
        category: 'sauce',
        name: 'Pesto',
        price: 50,
        stock: 120,
        threshold: 20
      },
      {
        category: 'sauce',
        name: 'Alfredo',
        price: 45,
        stock: 130,
        threshold: 20
      },
      {
        category: 'sauce',
        name: 'Spicy Marinara',
        price: 35,
        stock: 180,
        threshold: 30
      }
    ]);

    // Create cheeses
    const cheeses = await InventoryItem.insertMany([
      {
        category: 'cheese',
        name: 'Mozzarella',
        price: 60,
        stock: 300,
        threshold: 50
      },
      {
        category: 'cheese',
        name: 'Cheddar',
        price: 55,
        stock: 250,
        threshold: 40
      },
      {
        category: 'cheese',
        name: 'Parmesan',
        price: 70,
        stock: 200,
        threshold: 30
      },
      {
        category: 'cheese',
        name: 'Feta',
        price: 65,
        stock: 180,
        threshold: 25
      },
      {
        category: 'cheese',
        name: 'Blue Cheese',
        price: 80,
        stock: 150,
        threshold: 20
      }
    ]);

    // Create veggies
    const veggies = await InventoryItem.insertMany([
      {
        category: 'veggie',
        name: 'Bell Peppers',
        price: 25,
        stock: 200,
        threshold: 30
      },
      {
        category: 'veggie',
        name: 'Onions',
        price: 20,
        stock: 250,
        threshold: 40
      },
      {
        category: 'veggie',
        name: 'Mushrooms',
        price: 30,
        stock: 180,
        threshold: 25
      },
      {
        category: 'veggie',
        name: 'Olives',
        price: 35,
        stock: 150,
        threshold: 20
      },
      {
        category: 'veggie',
        name: 'Tomatoes',
        price: 20,
        stock: 220,
        threshold: 35
      },
      {
        category: 'veggie',
        name: 'Spinach',
        price: 25,
        stock: 180,
        threshold: 25
      },
      {
        category: 'veggie',
        name: 'Jalapeños',
        price: 30,
        stock: 160,
        threshold: 20
      },
      {
        category: 'veggie',
        name: 'Artichokes',
        price: 40,
        stock: 120,
        threshold: 15
      }
    ]);

    // Create meats
    const meats = await InventoryItem.insertMany([
      {
        category: 'meat',
        name: 'Pepperoni',
        price: 70,
        stock: 150,
        threshold: 25
      },
      {
        category: 'meat',
        name: 'Chicken',
        price: 80,
        stock: 140,
        threshold: 20
      },
      {
        category: 'meat',
        name: 'Ham',
        price: 75,
        stock: 130,
        threshold: 20
      },
      {
        category: 'meat',
        name: 'Sausage',
        price: 85,
        stock: 120,
        threshold: 15
      },
      {
        category: 'meat',
        name: 'Bacon',
        price: 90,
        stock: 110,
        threshold: 15
      },
      {
        category: 'meat',
        name: 'Ground Beef',
        price: 95,
        stock: 100,
        threshold: 10
      }
    ]);

    console.log('Seed data inserted successfully');
    console.log('Admin user created:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Sample user created:');
    console.log('Email: user@example.com');
    console.log('Password: user123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();