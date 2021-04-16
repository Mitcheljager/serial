class ElementSerializer < ActiveModel::Serializer
  attributes :uuid, :content_type, :position, :properties

  def properties
    JSON.parse(object.properties)
  end
end
