class AddDateToTodo < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :date, :date
  end
end
