class Page < ApplicationRecord
  belongs_to :project

  has_many :sections, dependent: :destroy
end
