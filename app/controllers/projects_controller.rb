class ProjectsController < ApplicationController
  def update
    @project = current_user.projects.find(params[:project_id])
    
    if @project.update(properties: params[:properties].to_json)
      render json: { message: "Saved succesfully" }, status: 200
      return
    end

    render json: { message: "An error occured" }, status: 500
  end
end
