class PageSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :sections

  def sections
    ActiveModel::SerializableResource.new(object.sections, each_serializer: SectionSerializer)
  end
end
