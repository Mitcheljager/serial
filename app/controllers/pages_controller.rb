class PagesController < ApplicationController
  def index
    @pages = current_user.projects.find(params[:project_id]).pages

    render json: @pages
  end

  def show
    @project = current_user.projects.find(params[:project_id])
    @page = @project.pages.find_by_uuid(params[:uuid])

    respond_to do |format|
      format.html
      format.json { render json: @page }
    end
  end

  def create
    @page = Page.new(page_params)

    if @page.save!
      render json: { message: "Saved succesfully" }, status: 200
    else
      render json: { message: "An error occured" }, status: 500
    end
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

  def page_params
    params.require(:page).permit(:title, :project_id, :uuid)
  end

  def save_sections
    @sections = params[:data][:sections]

    return true unless @sections.present?

    @sections.each do |section|
      @section = @page.sections.find_or_create_by(uuid: section[:uuid])
      
      if @section.update(
        page: @page,
        name: section[:name],
        position: section[:position],
        properties: section[:properties].to_json)

        return false unless save_elements(section)
      else
        return false
      end

      destroy_unused_sections
    end

    return true
  end

  def save_elements(section)
    @elements = section[:elements]

    return true unless @elements.present?

    @elements.each do |element|
      @element = @section.elements.find_or_create_by(uuid: element[:uuid])
      
      if @element.update(
        section: @section,
        content_type: element[:content_type],
        position: element[:position],
        properties: element[:properties].to_json)
      else
        return false
      end

      destroy_unused_elements
    end
  end

  def destroy_unused_sections
    section_uuids = @sections.pluck(:uuid)

    sections_to_destroy = @page.sections.where.not(uuid: section_uuids)
    sections_to_destroy.destroy_all
  end

  def destroy_unused_elements
    element_uuids = @elements.pluck(:uuid)

    elements_to_destroy = @section.elements.where.not(uuid: element_uuids)
    elements_to_destroy.destroy_all
  end
end
