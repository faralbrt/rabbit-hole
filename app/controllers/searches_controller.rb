class SearchesController < ApplicationController
  def index
    @query = params[:query]
  end
end
