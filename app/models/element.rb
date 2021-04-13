class Element < ApplicationRecord
  belongs_to :section

  serialize :properties
end
