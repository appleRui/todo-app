class Api::V1::NotesController < ApplicationController
  before_action :isAuthenticate

  def index
    notes = current_user.notes.order(created_at: :asc) if @result
    res = {result: @result, logout: @logout, notes: notes}
    render json: res
  end

  def create
    note = Note.new(note_params)
    note.user_id = current_user.id
    p note
    p note.new_record?
    if note.new_record?
      note.save!
    else
      note.update!
    end
  end

  def show
  end

  private 

  def note_params
    p params
    params.require(:params).permit(:title, :content)
  end
end
