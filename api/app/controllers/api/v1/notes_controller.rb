class Api::V1::NotesController < ApplicationController
  before_action :isAuthenticate

  def index
    notes = current_user.notes.order(created_at: :desc).as_json(except: [:user_id]) if @result
    res = {result: @result, logout: @logout, notes: notes}
    render json: res
  end

  def create
    note = Note.new(note_params)
    note.user_id = current_user.id
    if note.new_record? && @result
      note.save!
    else
      note.update!
    end
  end

  def update
    note = Note.find(params[:id])
    if note.update(note_params)
      render json: {
        result: @result,
        logout: @logout
      }
    end
  end

  def show
    note = Note.find(params[:id]).as_json(except: [:user_id]) if @result
    res = {result: @result, logout: @logout, note: note}
    render json: res
  end

  def destroy
    note = Note.find(params[:id])
    if note.destroy && @result
      res = {result: @result, logout: @logout}
      render json: res, status: 200
    else
      res = {result: @result, logout: @logout}
      render json: res, status: 400
    end
  end

  private 

  def note_params
    params.require(:params).permit(:title, :content)
  end

end
