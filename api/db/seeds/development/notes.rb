10.times do |n|
  title = "ノート#{n}"
  content = "ノート#{n}のコンテンツ"
  note = Note.find_or_initialize_by(title: title)

  if note.new_record?
    note.title = title
    note.content = content
    note.user_id = 11
    note.save!
  end
end

puts "Notes = #{Note.count}"