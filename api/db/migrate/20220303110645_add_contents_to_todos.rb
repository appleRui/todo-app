class AddContentsToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :content, :text
  end
end
