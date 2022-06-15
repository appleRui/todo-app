class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :name
      t.integer :priority, null: false, default: 4
      t.timestamps
    end
  end
end
