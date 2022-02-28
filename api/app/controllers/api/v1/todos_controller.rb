class Api::V1::TodosController < ApplicationController
  before_action :isAuthenticate

  def index
    todos = Todo.all if @isAuthenticate
    res = {result: @isAuthenticate, todos: todos.as_json(only: [:id, :name])}
    render json: res
  end
end
