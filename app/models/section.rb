class Section < ApplicationRecord
  belongs_to :page

  has_many :elements, dependent: :destroy

  serialize :properties
end
