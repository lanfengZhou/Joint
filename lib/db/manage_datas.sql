/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : manage_datas

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2017-06-20 21:59:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(80) NOT NULL,
  `number` varchar(40) NOT NULL,
  `belong` varchar(20) NOT NULL,
  `info` varchar(80) DEFAULT NULL,
  `state` int(2) NOT NULL,
  `insertTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES ('1', '实物1', '1', 'A', null, '1', '2017-06-20 14:04:26');
INSERT INTO `device` VALUES ('2', '实物2', '2', 'A', null, '1', '2017-06-20 14:04:50');
INSERT INTO `device` VALUES ('3', '实物3', '3', 'A', null, '1', '2017-06-20 14:05:20');
INSERT INTO `device` VALUES ('4', '实物4', '4', 'A', null, '1', '2017-06-20 14:05:37');
INSERT INTO `device` VALUES ('5', '实物5', '5', 'A', null, '1', '2017-06-20 14:05:55');
INSERT INTO `device` VALUES ('6', '实物6', '6', 'A', null, '1', '2017-06-20 14:06:13');
INSERT INTO `device` VALUES ('7', '实物7', '7', 'A', null, '1', '2017-06-20 14:07:02');
INSERT INTO `device` VALUES ('9', '实物8', '8', 'A', '2222', '0', '2017-06-20 16:55:38');

-- ----------------------------
-- Table structure for hisdata
-- ----------------------------
DROP TABLE IF EXISTS `hisdata`;
CREATE TABLE `hisdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) NOT NULL,
  `value` varchar(40) NOT NULL,
  `insertTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `deviceID` (`device_id`) USING BTREE,
  CONSTRAINT `deviceID` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hisdata
-- ----------------------------
INSERT INTO `hisdata` VALUES ('4', '9', '0', '2017-06-20 16:48:50');
INSERT INTO `hisdata` VALUES ('5', '9', '1', '2017-06-20 16:55:15');
INSERT INTO `hisdata` VALUES ('6', '9', '0', '2017-06-20 16:55:38');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `account` varchar(80) NOT NULL,
  `password` varchar(40) NOT NULL,
  `state` int(2) DEFAULT NULL,
  `power` int(2) DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhou', '18810926299', '1', '111111', '1', '0', '2017-06-05 09:41:57');
INSERT INTO `user` VALUES ('2', 'zhou1', 'uu', '2', '111111', '1', '0', '2017-06-06 11:08:12');
INSERT INTO `user` VALUES ('16', '1', '13333333333', '8', '11111111', '0', '0', '2017-06-06 11:08:19');
