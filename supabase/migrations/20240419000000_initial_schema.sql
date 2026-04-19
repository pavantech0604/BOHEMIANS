-- MENU ITEMS TABLE
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RESERVATIONS TABLE
CREATE TABLE reservations (
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

-- ORDERS TABLE
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  items JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- GALLERY TABLE
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE RLS
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

-- ADMIN ALL POLICIES (Assuming no auth for simplicity as requested/dev mode)
CREATE POLICY "Allow all on menu_items for everyone" ON menu_items FOR ALL USING (true);
CREATE POLICY "Allow all on reservations for everyone" ON reservations FOR ALL USING (true);
CREATE POLICY "Allow all on orders for everyone" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all on gallery for everyone" ON gallery FOR ALL USING (true);
