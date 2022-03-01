class Api::V1::TodosController < ApplicationController
  before_action :isAuthenticate

  def index
    todos = Todo.all if @result
    res = {result: @result, logout: @logout, todos: todos.as_json(only: [:id, :name])}
    render json: res
  end
end
