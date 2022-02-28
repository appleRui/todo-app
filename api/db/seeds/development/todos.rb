10.times do |n|
  name = "タスク#{n}"
  todo = Todo.find_or_initialize_by(name: name)

  if todo.new_record?
    todo.name = name
    todo.save!
  end
end

puts "users = #{Todo.count}"