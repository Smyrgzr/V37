const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================
  // CLEAN EXISTING DATA (optional for dev)
  // ============================================
  console.log('🧹 Cleaning existing data...');
  await prisma.booking.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.station.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.businessModule.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleaned!\n');

  // ============================================
  // CREATE USERS
  // ============================================
  console.log('👤 Creating users...');

  const hashedPassword = await bcrypt.hash('Letwash123!', 10);

  // Root Owner
  const rootOwner = await prisma.user.create({
    data: {
      email: 'admin@letwash.com',
      password: hashedPassword,
      fullName: 'Letwash Admin',
      phone: '+90 555 111 1111',
      role: 'ROOT_OWNER',
      isActive: true
    }
  });
  console.log(`  ✓ Root Owner: ${rootOwner.email}`);

  // Carwash Owner 1
  const owner1 = await prisma.user.create({
    data: {
      email: 'owner1@letwash.com',
      password: hashedPassword,
      fullName: 'John Smith',
      phone: '+90 555 222 2222',
      role: 'CARWASH_OWNER',
      isActive: true
    }
  });
  console.log(`  ✓ Carwash Owner 1: ${owner1.email}`);

  // Carwash Owner 2
  const owner2 = await prisma.user.create({
    data: {
      email: 'owner2@letwash.com',
      password: hashedPassword,
      fullName: 'Sarah Johnson',
      phone: '+90 555 333 3333',
      role: 'CARWASH_OWNER',
      isActive: true
    }
  });
  console.log(`  ✓ Carwash Owner 2: ${owner2.email}\n`);

  // ============================================
  // CREATE SUBSCRIPTIONS
  // ============================================
  console.log('💳 Creating subscriptions...');

  const subscription1 = await prisma.subscription.create({
    data: {
      userId: owner1.id,
      tierId: 'PROFESSIONAL',
      billingCycle: 'MONTHLY',
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.businessModule.createMany({
    data: [
      { userId: owner1.id, subscriptionId: subscription1.id, moduleName: 'IN_BAY' },
      { userId: owner1.id, subscriptionId: subscription1.id, moduleName: 'TUNNEL' },
      { userId: owner1.id, subscriptionId: subscription1.id, moduleName: 'SELF_SERVICE' },
      { userId: owner1.id, subscriptionId: subscription1.id, moduleName: 'MANUAL_DETAILING' }
    ]
  });

  console.log(`  ✓ Professional subscription for ${owner1.fullName}\n`);

  const subscription2 = await prisma.subscription.create({
    data: {
      userId: owner2.id,
      tierId: 'STARTER',
      billingCycle: 'MONTHLY',
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.businessModule.createMany({
    data: [
      { userId: owner2.id, subscriptionId: subscription2.id, moduleName: 'IN_BAY' },
      { userId: owner2.id, subscriptionId: subscription2.id, moduleName: 'SELF_SERVICE' }
    ]
  });

  console.log(`  ✓ Starter subscription for ${owner2.fullName}\n`);

  // ============================================
  // CREATE BRANCHES
  // ============================================
  console.log('🏢 Creating branches...');

  const branch1 = await prisma.branch.create({
    data: {
      ownerId: owner1.id,
      name: 'Letwash Downtown',
      address: '123 Main Street',
      city: 'Istanbul',
      state: 'Istanbul',
      zipCode: '34000',
      country: 'Turkey',
      phone: '+90 555 444 4444',
      email: 'downtown@letwash.com',
      latitude: 41.0082,
      longitude: 28.9784,
      businessModels: ['IN_BAY', 'TUNNEL', 'SELF_SERVICE'],
      operatingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '18:00' },
        sunday: { open: '10:00', close: '17:00' }
      },
      isActive: true
    }
  });
  console.log(`  ✓ ${branch1.name}`);

  const branch2 = await prisma.branch.create({
    data: {
      ownerId: owner1.id,
      name: 'Letwash Mall',
      address: '456 Shopping Ave',
      city: 'Istanbul',
      state: 'Istanbul',
      zipCode: '34100',
      country: 'Turkey',
      phone: '+90 555 555 5555',
      email: 'mall@letwash.com',
      latitude: 41.0122,
      longitude: 28.9825,
      businessModels: ['IN_BAY', 'MANUAL_DETAILING'],
      operatingHours: {
        monday: { open: '10:00', close: '22:00' },
        tuesday: { open: '10:00', close: '22:00' },
        wednesday: { open: '10:00', close: '22:00' },
        thursday: { open: '10:00', close: '22:00' },
        friday: { open: '10:00', close: '22:00' },
        saturday: { open: '10:00', close: '22:00' },
        sunday: { open: '10:00', close: '22:00' }
      },
      isActive: true
    }
  });
  console.log(`  ✓ ${branch2.name}`);

  const branch3 = await prisma.branch.create({
    data: {
      ownerId: owner2.id,
      name: 'Express Wash',
      address: '789 Highway Road',
      city: 'Ankara',
      state: 'Ankara',
      zipCode: '06000',
      country: 'Turkey',
      phone: '+90 555 666 6666',
      email: 'express@letwash.com',
      latitude: 39.9334,
      longitude: 32.8597,
      businessModels: ['IN_BAY', 'SELF_SERVICE'],
      operatingHours: {
        monday: { open: '07:00', close: '21:00' },
        tuesday: { open: '07:00', close: '21:00' },
        wednesday: { open: '07:00', close: '21:00' },
        thursday: { open: '07:00', close: '21:00' },
        friday: { open: '07:00', close: '21:00' },
        saturday: { open: '08:00', close: '20:00' },
        sunday: { open: '09:00', close: '19:00' }
      },
      isActive: true
    }
  });
  console.log(`  ✓ ${branch3.name}\n`);

  // ============================================
  // CREATE STATIONS
  // ============================================
  console.log('🚿 Creating stations...');

  await prisma.station.createMany({
    data: [
      // Branch 1 stations
      { branchId: branch1.id, name: 'Bay 1', type: 'IN_BAY', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch1.id, name: 'Bay 2', type: 'IN_BAY', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch1.id, name: 'Tunnel Line', type: 'TUNNEL', status: 'AVAILABLE', capacity: 5 },
      { branchId: branch1.id, name: 'Self-Service 1', type: 'SELF_SERVICE', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch1.id, name: 'Self-Service 2', type: 'SELF_SERVICE', status: 'AVAILABLE', capacity: 1 },
      
      // Branch 2 stations
      { branchId: branch2.id, name: 'Premium Bay 1', type: 'IN_BAY', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch2.id, name: 'Premium Bay 2', type: 'IN_BAY', status: 'AVAILABLE', capacity: 1 },
      
      // Branch 3 stations
      { branchId: branch3.id, name: 'Express Bay 1', type: 'IN_BAY', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch3.id, name: 'Self 1', type: 'SELF_SERVICE', status: 'AVAILABLE', capacity: 1 },
      { branchId: branch3.id, name: 'Self 2', type: 'SELF_SERVICE', status: 'AVAILABLE', capacity: 1 }
    ]
  });
  console.log('  ✓ 10 stations created\n');

  // ============================================
  // CREATE SERVICES
  // ============================================
  console.log('🧼 Creating services...');

  const vehicleMultipliers = {
    SEDAN: 1.0,
    SUV: 1.3,
    TRUCK: 1.5,
    ELECTRIC_VEHICLE: 1.2,
    LUXURY: 1.8,
    MOTORCYCLE: 0.7,
    VAN: 1.4
  };

  await prisma.service.createMany({
    data: [
      // Branch 1 services
      {
        branchId: branch1.id,
        name: 'Basic Wash',
        description: 'Exterior wash and dry',
        businessModel: 'IN_BAY',
        basePrice: 50,
        baseDuration: 15,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Exterior Wash', 'Foam Brush', 'Spot-Free Rinse', 'Air Dry'],
        displayOrder: 1
      },
      {
        branchId: branch1.id,
        name: 'Deluxe Wash',
        description: 'Complete wash with wax',
        businessModel: 'IN_BAY',
        basePrice: 100,
        baseDuration: 25,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Exterior Wash', 'Tire Shine', 'Wax', 'Spot-Free Rinse', 'Air Dry'],
        displayOrder: 2
      },
      {
        branchId: branch1.id,
        name: 'Ultimate Wash',
        description: 'Premium wash with interior cleaning',
        businessModel: 'IN_BAY',
        basePrice: 150,
        baseDuration: 35,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Exterior Wash', 'Interior Vacuum', 'Tire Shine', 'Wax', 'Glass Clean', 'Air Freshener'],
        displayOrder: 3
      },
      {
        branchId: branch1.id,
        name: 'Self-Service Bay',
        description: 'Do it yourself wash',
        businessModel: 'SELF_SERVICE',
        basePrice: 30,
        baseDuration: 20,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['High-Pressure Wash', 'Foam Brush', 'Spot-Free Rinse'],
        displayOrder: 4
      },
      
      // Branch 2 services
      {
        branchId: branch2.id,
        name: 'Premium Detailing',
        description: 'Complete interior and exterior detailing',
        businessModel: 'MANUAL_DETAILING',
        basePrice: 300,
        baseDuration: 120,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Hand Wash', 'Clay Bar', 'Wax & Polish', 'Interior Deep Clean', 'Engine Bay Clean', 'Tire Dressing'],
        displayOrder: 1
      },
      {
        branchId: branch2.id,
        name: 'Express Wash',
        description: 'Quick exterior wash',
        businessModel: 'IN_BAY',
        basePrice: 60,
        baseDuration: 15,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Exterior Wash', 'Quick Dry'],
        displayOrder: 2
      },
      
      // Branch 3 services
      {
        branchId: branch3.id,
        name: 'Basic Exterior',
        description: 'Standard exterior wash',
        businessModel: 'IN_BAY',
        basePrice: 45,
        baseDuration: 15,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['Exterior Wash', 'Rinse', 'Dry'],
        displayOrder: 1
      },
      {
        branchId: branch3.id,
        name: 'Self-Wash',
        description: 'DIY wash station',
        businessModel: 'SELF_SERVICE',
        basePrice: 25,
        baseDuration: 15,
        vehicleTypeMultipliers: vehicleMultipliers,
        features: ['High-Pressure Wash', 'Soap', 'Rinse'],
        displayOrder: 2
      }
    ]
  });
  console.log('  ✓ 8 services created\n');

  // ============================================
  // CREATE CUSTOMERS
  // ============================================
  console.log('👥 Creating customers...');

  const customer1 = await prisma.customer.create({
    data: {
      branchId: branch1.id,
      email: 'customer1@example.com',
      phone: '+90 555 111 0001',
      fullName: 'Michael Brown',
      address: '111 Customer St, Istanbul',
      totalVisits: 5,
      totalSpent: 450,
      lastVisit: new Date()
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      branchId: branch1.id,
      email: 'customer2@example.com',
      phone: '+90 555 111 0002',
      fullName: 'Emily Davis',
      address: '222 Customer St, Istanbul',
      totalVisits: 3,
      totalSpent: 300
    }
  });

  const customer3 = await prisma.customer.create({
    data: {
      branchId: branch2.id,
      email: 'customer3@example.com',
      phone: '+90 555 111 0003',
      fullName: 'David Wilson',
      address: '333 Customer St, Istanbul',
      totalVisits: 7,
      totalSpent: 850
    }
  });

  console.log('  ✓ 3 customers created\n');

  // ============================================
  // CREATE CAMPAIGNS
  // ============================================
  console.log('🎉 Creating campaigns...');

  await prisma.campaign.createMany({
    data: [
      {
        branchId: branch1.id,
        title: 'Summer Special',
        description: 'Get 20% off on all services',
        type: 'PERCENTAGE_DISCOUNT',
        discountPercent: 20,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        code: 'SUMMER20',
        applicableServices: [],
        applicableVehicles: []
      },
      {
        branchId: branch2.id,
        title: 'Premium Package',
        description: '₺50 off on detailing services',
        type: 'FIXED_AMOUNT_DISCOUNT',
        discountValue: 50,
        minPurchase: 200,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        code: 'PREMIUM50',
        applicableServices: [],
        applicableVehicles: []
      }
    ]
  });
  console.log('  ✓ 2 campaigns created\n');

  // ============================================
  // CREATE NOTIFICATIONS
  // ============================================
  console.log('🔔 Creating notifications...');

  await prisma.notification.createMany({
    data: [
      {
        userId: owner1.id,
        type: 'SYSTEM_ALERT',
        title: 'Welcome to Letwash!',
        message: 'Your account has been successfully created. Start managing your car wash business today!'
      },
      {
        userId: owner2.id,
        type: 'SYSTEM_ALERT',
        title: 'Welcome to Letwash!',
        message: 'Your account has been successfully created. Start managing your car wash business today!'
      }
    ]
  });
  console.log('  ✓ 2 notifications created\n');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('✅ Database seeding completed!\n');
  console.log('📊 Summary:');
  console.log('   - 3 Users (1 Root Owner, 2 Carwash Owners)');
  console.log('   - 2 Subscriptions');
  console.log('   - 3 Branches');
  console.log('   - 10 Stations');
  console.log('   - 8 Services');
  console.log('   - 3 Customers');
  console.log('   - 2 Campaigns');
  console.log('   - 2 Notifications');
  console.log('\n🔐 Test Credentials:');
  console.log('   Root Owner:    admin@letwash.com / Letwash123!');
  console.log('   Owner 1:       owner1@letwash.com / Letwash123!');
  console.log('   Owner 2:       owner2@letwash.com / Letwash123!');
  console.log('\n🎉 Happy testing!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
