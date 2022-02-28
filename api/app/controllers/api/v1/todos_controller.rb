class Api::V1::TodosController < ApplicationController
  def index
    todos = Todo.all
    render json: todos.as_json(only: [:id, :name])
  end
end
