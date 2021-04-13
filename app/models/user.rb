class User < ApplicationRecord
  has_secure_password

  has_many :remember_tokens, dependent: :destroy
  has_many :project_users
  has_many :projects, through: :project_users

  encrypts :email
  blind_index :email

  validates :username, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A[\d\p{L}_-]*[#\d]*\z/i }
  validates :password, presence: true, length: { minimum: 8 }, if: :password
  validates :email, uniqueness: true, allow_blank: true
end
