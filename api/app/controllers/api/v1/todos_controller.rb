class Api::V1::TodosController < ApplicationController
  before_action :isAuthenticate

  def index
    todos = current_user.todos.order(created_at: :asc) if @result
    res = {result: @result, logout: @logout, todos: todos}
    render json: res
  end

  def create
    new_todo = Todo.new(todo_params)
    new_todo.user_id = current_user.id
    new_todo.save! if @result
    res = {result: @result, logout: @logout, new_todo: new_todo}
    render json: res
  end

  def show
    todo = Todo::find(params[:id]) if @result
    res = {result: @result, logout: @logout, todo: todo}
    render json: res
  end

  def update
    todo = Todo.find(params[:id])
    @result = todo.update(todo_params)
    res = {result: @result, logout: @logout}
    render json: res
  end

  def destroy
    todo = Todo.find(params[:id])
    @result = todo.delete
    res = {result: @result, logout: @logout}
    render json: res
  end

  private

  def todo_params
    params.require(:params).permit(:name, :content, :date, :check, :priority)
  end
  
end
