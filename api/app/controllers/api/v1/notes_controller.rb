class Api::V1::NotesController < ApplicationController
  before_action :isAuthenticate

  def index
    notes = current_user.notes.order(created_at: :asc) if @result
    res = {result: @result, logout: @logout, notes: notes}
    render json: res
  end

  def create
  end

  def show
  end
end
