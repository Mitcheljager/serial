class Section < ApplicationRecord
  belongs_to :page

  has_many :elements

  serialize :properties
end
