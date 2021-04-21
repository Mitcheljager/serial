class PageSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :sections

  def sections
    ActiveModel::SerializableResource.new(
      object.sections.order(:position, :asc),
      each_serializer: SectionSerializer
    )
  end
end
