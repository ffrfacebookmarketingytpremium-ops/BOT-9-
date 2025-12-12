module.exports = {
  config: {
    name: 'rdxhere',
    aliases: ['highjack'],
    description: 'Flood group with messages and add users, then rename group',
    usage: 'rdxhere',
    category: 'Admin',
    groupOnly: true,
    prefix: true
  },

  async run({ api, event, send, config }) {
    const { threadID, senderID } = event;

    if (!config.ADMINBOT.includes(senderID)) {
      return send.reply('❌ Only bot admins can use this command!');
    }

    const messages = [
      "𝐍𝐨𝐰 𝐥𝐨𝐚𝐝𝐢𝐧𝐠...",
      "⋘ 𝑙𝑜𝑎𝑑𝑖𝑛𝑔 𝑑𝑎𝑡𝑎...⋙",
      "[■■■■■■■■■■] 100%",
      "𝗔𝗝𝗨𝗢 𝗗𝗢𝗦𝗧𝗢 𝗬𝗔 𝗚𝗥𝗢𝗨𝗣 𝗕𝗛𝗜 𝗛𝗜𝗚𝗛𝗝𝗔𝗖𝗞 𝗛𝗢 𝗚𝗬𝗔"
    ];

    const usersToAdd = [
      "61582862311675",
      "61582915079134",
      "61582448566237",
      "61583038793097",
      "61582740037285",
      "61583077011427",
      "61582528696444",
      "61582664773755",
      "61582596827519",
      "61578127172132",
      "61582857304912",
      "61583082354079"
    ];

    const newGroupName = "🩷𓆩𝐊𝐎𝐈 𝐏𝐎𝐂𝐇𝐘 𝐓𝐎 𝐊𝐇𝐍𝐀 𝐒𝐀𝐑𝐃𝐀𝐑 𝐑𝐃𝐗 𝐀𝐘𝐀 𝐓𝐇𝐀 🖤𓆪𓆤";

    try {
      await api.sendMessage("🚀𝑹𝑫𝑿 𝑯𝑰𝑮𝑯𝑱𝑨𝑪𝑲 𝑮𝑪 𝑳𝑶𝑨𝑫𝑰𝑵𝑮 ........", threadID);

      for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage(messages[i], threadID);
      }

      let addedCount = 0;
      let failedCount = 0;

      for (let i = 0; i < usersToAdd.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
          await api.addUserToGroup([usersToAdd[i]], threadID);
          addedCount++;
          await api.sendMessage(`✅ Added ${i + 1}/${usersToAdd.length}`, threadID);
        } catch (error) {
          failedCount++;
          const errMsg = error?.message || error?.error || JSON.stringify(error) || 'Unknown error';
          await api.sendMessage(`❌ Failed ${i + 1}: ${errMsg}`, threadID);
        }
      }

      let renameSuccess = false;
      try {
        await api.setTitle(newGroupName, threadID);
        renameSuccess = true;
        await api.sendMessage(`✅ Group renamed to:\n${newGroupName}`, threadID);
      } catch (renameError) {
        console.log('Rename error:', renameError?.message || renameError);
        await api.sendMessage(`⚠️ Unable to rename group automatically.`, threadID);
      }

      await api.sendMessage(
        `✅ Hack sequence completed!\n\n📊 Results:\n✅ Added: ${addedCount}\n❌ Failed: ${failedCount}\n\n🔁 Rename: ${renameSuccess ? 'Success' : 'Failed'}`,
        threadID
      );

    } catch (error) {
      console.error("rdxhere error:", error);
      return send.reply(`❌ Error during hack sequence: ${error.message}`);
    }
  }
};
