package com.todaypill.service;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todaypill.chat.model.Message;
import com.todaypill.chat.model.Status;
import com.todaypill.chat.model.User;
import com.todaypill.db.entity.ChattingRoom;
import com.todaypill.repository.ChatRepository;

@Service
public class ChatService {

	@Autowired
	ChatRepository chatRepository;

	public ChatService(ChatRepository chatRepository) {
		super();
		this.chatRepository = chatRepository;
	}
	
	@Transactional
	public void recordChat(String _id, String text, String senderName, String createdAt, String status, 
			User user, String roomName, Integer supplementId) throws Exception {

		ChattingRoom chattingRoom = ChattingRoom.builder()._id(_id).text(text).senderName(senderName)
				.createdAt(createdAt).status(status).userId(user.get_id()).
				name(user.getName()).roomName(roomName).supplementId(supplementId).build();
		chatRepository.save(chattingRoom);
		
	}
	
	@Transactional
	public List<Message> selectAllChat(String roomName) throws Exception {
		

		List<ChattingRoom> list = chatRepository.selectAllChat(roomName);
		List<Message> mList = new ArrayList();
		for(int i=0; i<list.size();i++) {
			User user = new User(list.get(i).getUserId(), list.get(i).getName());
			Message msg = new Message(list.get(i).get_id(), list.get(i).getText(),
					list.get(i).getSenderName(), list.get(i).getCreatedAt(), Status.MESSAGE, user, list.get(i).getSupplementId());
			mList.add(msg);
		}
		
		return mList;
	}
}
