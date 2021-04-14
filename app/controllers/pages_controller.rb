class PagesController < ApplicationController
  def index
    @pages = current_user.projects.find(params[:project_id]).pages

    render json: @pages
  end

  def show
    if params[:uuid].present?
      @page = current_user.projects.find(params[:project_id]).pages.includes(sections: [:elements]).find_by_uuid(params[:uuid])
    else
      @page = current_user.projects.find(params[:project_id]).pages.includes(sections: [:elements]).first
    end

    render json: @page.to_json
  end
end
