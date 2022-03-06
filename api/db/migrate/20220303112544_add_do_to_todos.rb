class AddDoToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :check, :boolean, default: false
  end
end
