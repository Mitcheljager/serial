class Project < ApplicationRecord
  has_many :project_users, dependent: :destroy
  has_many :users, through: :project_users
  has_many :pages, dependent: :destroy

  has_many_attached :images, dependent: :destroy

  serialize :properties
end
