class SectionsController < ApplicationController
  def show
    render partial: "sections/columns.html.erb"
  end
end
