-- ==========================================
-- BOHEMIANS DIGITAL SANCTUARY: INITIALIZATION SCRIPT
-- ==========================================

-- 1. DATABASE SCHEMA
-- ==========================================

-- MENU ITEMS TABLE (Curated Culinary Assets)
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RESERVATIONS TABLE (Guest List Archive)
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  guests TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ORDERS TABLE (Gastronic Flow Monitor)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  items JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- GALLERY TABLE (Visual Archive)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SECURITY (Row Level Security)
-- ==========================================

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- PUBLIC SELECT POLICIES
CREATE POLICY "Allow public select on menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public select on gallery" ON gallery FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (for customers)
CREATE POLICY "Allow public insert on reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);

-- ADMIN ALL POLICIES (Universal access for management console)
CREATE POLICY "Allow all on menu_items for admins" ON menu_items FOR ALL USING (true);
CREATE POLICY "Allow all on reservations for admins" ON reservations FOR ALL USING (true);
CREATE POLICY "Allow all on orders for admins" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all on gallery for admins" ON gallery FOR ALL USING (true);

-- 3. SIGNATURE SEED DATA
-- ==========================================

-- MENU ITEMS SEED
INSERT INTO menu_items (name, price, description, image_url, category, is_available) VALUES
('Norwegian Thyme Grilled Salmon', '₹725', 'Slow-grilled Atlantic salmon infused with garden thyme and lemon-zest butter. Chef''s Note: Pair with a crisp Boho Gin Sour.', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800', 'Mains', true),
('Charcoal Mushroom Dim Sums', '₹445', 'Signature black-skinned dumplings filled with exotic forest mushrooms. Chef''s Note: The black skin is achieved using natural edible charcoal.', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800', 'Small Plates', true),
('Aam Panna Kick', '₹395', 'A nostalgic green mango coolant electrified with botanical infusions. Chef''s Note: A tribute to Indian summers with a rebellious twist.', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', 'Cocktails', true),
('Boho Sushi Roll', '₹495', 'Tempura prawn, creamy avocado, and spicy sriracha mayo. Chef''s Note: Our most popular small plate in Indiranagar.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800', 'Small Plates', true),
('Pollo A La Brasa', '₹545', 'Peruvian-style rotisserie chicken marinated in signature spices. Chef''s Note: Marinated for 24 hours for maximum social energy.', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800', 'Mains', true),
('Mango Paneer Tikka', '₹425', 'Fresh heritage paneer glazed with a ripe mango reduction. Chef''s Note: A sweet and savory collision for the curious palate.', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800', 'Small Plates', true),
('Mediterranean Mezze Platter', '₹525', 'A vibrant platter with hummus, babaganoush, and artisanal pita. Chef''s Note: Ideal for sharing during a long social afternoon.', 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800', 'Mains', true),
('Railway Mutton Curry', '₹595', 'Legendary slow-cooked bungalow classic lamb curry. Chef''s Note: A recipe passed down through generations of hospitality.', 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?auto=format&fit=crop&q=80&w=800', 'Mains', true);

-- GALLERY SEED
INSERT INTO gallery (image_url, title, category) VALUES
('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', 'The Frida Heritage Mural', 'Interior'),
('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200', 'Sanctuary at Night', 'Interior'),
('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200', 'Artistic Rebellion', 'Interior'),
('https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800', 'Signature Charcoal Dim Sums', 'Plates'),
('https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', 'Aam Panna Kick', 'Cocktails'),
('https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800', 'Mediterranean Fusion', 'Plates'),
('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', 'The Urban Jungle', 'Interior'),
('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200', 'Botanical Mixology', 'Cocktails');
