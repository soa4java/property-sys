package com.property.sys.model;

import java.io.Serializable;

/**
 * 文章表
 */
public class Article implements Serializable{
	private static final long serialVersionUID = 3870996444951119364L;
	
	public static final String TYPE_COMMUNITY_ACTIVITIES="活动";
	public static final String TYPE_COMMUNITY_ISSUES="议题";
	public static final String TYPE_VOTE="投票";
	public static final String TYPE_COMPLAINT="投诉";
	public static final String TYPE_CONSULT="咨询";
	public static final String TYPE_NOTICE="公告";
	
	private Integer id;
	private String type;//类型(社区活动、社区信息、投票、投诉、咨询)
	private String title;//标题
	private String content;//内容
	private Integer userId;//用户id
	private String author;//发布人
	private String publishDate;//发布时间
	private long visitors;//访问人数
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public long getVisitors() {
		return visitors;
	}
	public void setVisitors(long visitors) {
		this.visitors = visitors;
	}
	public String getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}
}
