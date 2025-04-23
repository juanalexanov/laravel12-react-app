-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('guest', 'user', 'admin') DEFAULT 'guest',
  isSpeaker BOOLEAN DEFAULT FALSE
);

-- Create seminars table
CREATE TABLE seminars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  eventDate DATE NOT NULL,
  eventTime TIME NOT NULL,
  speaker_id INT,
  price DECIMAL(10,2) DEFAULT 0,
  googleMeetLink VARCHAR(255),
  FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create registrations table
CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  seminar_id INT NOT NULL,
  registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE
);

-- Create payments table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  seminar_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  invoiceNumber VARCHAR(50) NOT NULL,
  paymentMethod VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE
);

-- Create feedbacks table
CREATE TABLE feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  seminar_id INT NOT NULL,
  rating INT NOT NULL,
  review TEXT,
  feedbackDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE
);

-- Create speaker_applications table
CREATE TABLE speaker_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  remarks TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create seminar_speakers table
CREATE TABLE seminar_speakers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seminar_id INT NOT NULL,
  speaker_id INT NOT NULL,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE,
  FOREIGN KEY (speaker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_role_history table
CREATE TABLE user_role_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  actionType VARCHAR(50) NOT NULL,
  actionDetails TEXT,
  actionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
