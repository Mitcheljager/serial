class Page < ApplicationRecord
  belongs_to :project

  has_many :sections

  def as_json(options={})
    super(include: { sections: { include: :elements } })
  end
end
