class SectionSerializer < ActiveModel::Serializer
  attributes :uuid, :name, :position, :properties, :elements

  def properties
    JSON.parse(object.properties)
  end

  def elements
    ActiveModel::SerializableResource.new(
      object.elements.order(:position, :asc),
      each_serializer: ElementSerializer
    )
  end
end
