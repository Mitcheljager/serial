class Page < ApplicationRecord
  belongs_to :project

  has_many :sections, dependent: :destroy

  validates :uuid, presence: true
  validates :title, presence: true
end
