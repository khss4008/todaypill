package com.todaypill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.ChattingRoom;

@Repository
public interface ChatRepository extends JpaRepository<ChattingRoom, Integer>{

	@Query(value = "select * from `chatting_room` where room_name=?1 order by chat_id desc limit 100", nativeQuery = true)
	List<ChattingRoom> selectAllChat(String roomName);
	
}
