-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 19, 2025 at 06:06 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webclass5`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(5, 'Nike'),
(6, 'No name'),
(4, 'NW');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(3, 'Books'),
(2, 'Burgers'),
(4, 'Furniture'),
(5, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `google_users`
--

CREATE TABLE `google_users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `google_users`
--

INSERT INTO `google_users` (`id`, `google_id`, `name`, `email`, `user_type`) VALUES
(1, '109266609465368536032', 'Austin Masamhiri', 'ausiemass@gmail.com', 0),
(2, '120240131', 'ausiemass1', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Inventory_Transactions`
--

CREATE TABLE `Inventory_Transactions` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `transaction_type` enum('Purchase','Return','Sale') NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Order_Items`
--

CREATE TABLE `Order_Items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('Credit Card','PayPal','Bank Transfer','Cash') DEFAULT 'Credit Card',
  `status` enum('Pending','Completed','Failed') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `keywords` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `description`, `keywords`, `price`, `stock`, `brand_id`, `category_id`, `image`) VALUES
(24, 'McDouble', 'It is a variation on the double cheeseburger, with only one slice of cheese placed between the two beef patties', ' All Beef Patties, Seasoned Beef, Salt and Pepper Burger, Double Patty Burger, McDonald\'s Double Cheeseburger, Juicy Beef Burger, Classic Cheeseburger, Pure Beef Burger,', 13.00, NULL, 5, 3, '1737193295908-2-3.jpg'),
(25, 'Cheeseburger', 'A cheeseburger is a hamburger with a slice of melted cheese on top of the meat patty, added near the end of the cooking time', ' All Beef Patties, Seasoned Beef, Salt and Pepper Burger, Double Patty Burger, McDonald\'s Double Cheeseburger, Juicy Beef Burger, Classic Cheeseburger, Pure Beef Burger,', 12.00, NULL, 4, 3, '1736930848967-cabbage_purple1.jpeg'),
(26, 'Big Mac', 'Big Mac is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties', 'cabbage, green, white, purple, vegetables', 123.00, NULL, NULL, NULL, '1733467786082-5-2.jpg'),
(27, 'Double Cheeseburger', 'Double Cheeseburger features two 100% pure all beef patties seasoned with just a pinch of salt and pepper.', ' Double Cheeseburger, Juicy Beef Burger, Classic Cheeseburger, Pure Beef Burger, Fast Food Burger, McDonald\'s Burger,', 12.00, NULL, NULL, NULL, '1733467935595-3-1.jpg'),
(28, 'Quarter Pounder with Cheese', 'The Quarter Pounder with Cheese is one of McDonald\'s signature burgers, known for its simplicity and bold flavor. It features a juicy quarter-pound beef patty (before cooking), seasoned with just a pinch of salt and pepper', ' Quarter Pounder, Quarter Pounder with Cheese, McDonald\'s Quarter Pounder, Beef Burger, Cheese Burger, American Cheese Burger', 123.00, NULL, NULL, NULL, '1733468182457-6-3.jpg'),
(29, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 12.00, NULL, NULL, NULL, '4-2.jpg'),
(30, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 123.00, NULL, NULL, NULL, '1-1-1.jpg'),
(31, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 123.00, NULL, NULL, NULL, 'hamb-big.jpg'),
(32, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 1234.00, NULL, NULL, NULL, '6-1.jpg'),
(33, 'potatoes', 'Cabbage is a verry good vegetable', 'cabbage, green, white, purple, vegetables', 21345.00, NULL, NULL, NULL, '2-2-1.jpg'),
(34, 'cabbage', 'cabbage is an verry good vegetable', 'onions, cheese ', 3.50, NULL, NULL, NULL, '3-3.jpg'),
(35, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 1234.00, NULL, 5, 3, '2-2.jpg'),
(36, 'cabbage', 'cabbage is an verry good vegetable', 'Lettuce, green, white,  vegetables, salads', 1234.00, NULL, 5, 2, '4-2.jpg'),
(37, 'cabbage', 'laravel is a good framework', 'cabbage, green, white, purple, vegetables', 12.00, NULL, NULL, NULL, '4-1.jpg'),
(38, 'burger', 'The Quarter Pounder with Cheese is one of McDonald\'s signature burgers, known for its simplicity and bold flavor. It features a juicy quarter-pound beef patty (before cooking), seasoned with just a pinch of salt and pepper', 'potatoes, starch, chips, root vegetables', 12.00, NULL, 5, 3, 'cabage1.jpeg'),
(39, 'apples', 'a cultivated plant of the daisy family, with edible leaves that are eaten in salads.', 'Lettuce, green, white,  vegetables, salads', 2.00, NULL, 4, 5, 'istockphoto-478157668-1024x1024.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_type` varchar(255) NOT NULL DEFAULT 'user',
  `reset_token` varchar(255) DEFAULT NULL,
  `token_expiry` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `surname`, `phone`, `email`, `user_type`, `reset_token`, `token_expiry`) VALUES
(1, 'tom', '$2b$10$sSyi0/1a6cgjAJ2gLA1AWO.rcOYHn4w/0QLBjd46XL3Y6w6TE22C6', 'Masamhiri', '+64 123456778', 'ausiemass@gmail.com', 'User', NULL, NULL),
(3, 'austin', '$2b$10$jV.F4c6V6Z/aW2XKme6S5OiZAC/j23u4nHfVL7X7gPBrTN.Nu9ZUy', 'chikasha', '+64 022 4566798', 'ausiemass@yahoo.com', 'Admin', NULL, NULL),
(8, 'Thomas', '$2b$10$X/zI9CpN1bl.Tsk5BlSstOUkcoVm2Z5/AE7EFH16ktRNSuGvhvS5S', 'Masamhiri', '12345678', 'tom@gmail.com', 'User', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `weekly_sales`
--

CREATE TABLE `weekly_sales` (
  `id` int(11) NOT NULL,
  `weeK` varchar(255) NOT NULL,
  `sales_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weekly_sales`
--

INSERT INTO `weekly_sales` (`id`, `weeK`, `sales_amount`) VALUES
(1, '1', 24.00),
(2, '1', 14.00),
(3, '1', 15.00),
(4, '1', 12.00),
(5, '1', 20.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brand_name` (`brand_name`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `google_users`
--
ALTER TABLE `google_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Inventory_Transactions`
--
ALTER TABLE `Inventory_Transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `weekly_sales`
--
ALTER TABLE `weekly_sales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `google_users`
--
ALTER TABLE `google_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Inventory_Transactions`
--
ALTER TABLE `Inventory_Transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Order_Items`
--
ALTER TABLE `Order_Items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `weekly_sales`
--
ALTER TABLE `weekly_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Inventory_Transactions`
--
ALTER TABLE `Inventory_Transactions`
  ADD CONSTRAINT `inventory_transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
