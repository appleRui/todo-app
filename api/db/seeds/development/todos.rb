10.times do |n|
  name = "タスク#{n}"
  content = "タスク#{n}の説明"
  todo = Todo.find_or_initialize_by(name: name)

  if todo.new_record?
    todo.name = name
    todo.content = content
    todo.date = Date.today
    todo.user_id = rand(1..5)
    todo.save!
  end
end

puts "todos = #{Todo.count}"