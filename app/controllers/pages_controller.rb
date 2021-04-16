class PagesController < ApplicationController
  def index
    @pages = current_user.projects.find(params[:project_id]).pages

    render json: @pages
  end

  def show
    @page = current_user.projects.find(params[:project_id]).pages.find_by_uuid(params[:uuid])

    render json: @page
  end

  def update
    @page = current_user.projects.find(params[:project_id]).pages.find_or_create_by(uuid: params[:data][:uuid])
    
    if @page.update(title: params[:data][:title])
      if save_sections
        render json: { message: "Saved succesfully" }, status: 200
        return
      end
    end

    render json: { message: "An error occured" }, status: 500
  end

  private

  def save_sections
    sections = params[:data][:sections]

    return true unless sections.present?

    sections.each do |section|
      @section = Section.find_or_create_by(uuid: section[:uuid])
      
      if @section.update(
        page: @page,
        name: section[:name],
        position: section[:position],
        properties: section[:properties].to_json)

        return false unless save_elements(section)
      else
        return false
      end
    end

    return true
  end

  def save_elements(section)
    elements = section[:elements]

    return true unless elements.present?

    elements.each do |element|
      @element = Element.find_or_create_by(uuid: element[:uuid])
      
      if @element.update(
        section: @section,
        content_type: element[:content_type],
        position: element[:position],
        properties: element[:properties].to_json)
      else
        return false
      end
    end
  end

  def destroy_unused_sections
  end

  def destroy_unused_elements
  end
end
