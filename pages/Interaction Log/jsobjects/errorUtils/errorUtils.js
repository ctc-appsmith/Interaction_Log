export default {
  formatErrorMessage: (error) => {
    try {
      console.log("Raw Error:", error);
      
      // Try to get the selected entity and action details
      const entityInfo = {
        selectedEntity: select_entity.selectedOptionValue, // Update this to match your actual select widget name
        operationType: 'INSERT', // Since we know it's failing on insert/log records
        timestamp: new Date().toLocaleString()
      };

      const formattedError = `
🚨 ENTITY-SPECIFIC ERROR DETAILS 🚨

Operation Details:
----------------
Entity: ${entityInfo.selectedEntity}
Operation Type: ${entityInfo.operationType}
User: ${appsmith.user.email}
Timestamp: ${entityInfo.timestamp}

Error Details:
-------------
${typeof error === 'string' ? error : JSON.stringify(error, null, 2)}

Known Working Operations:
----------------------
✓ Updates for this entity
✓ Inserts for other entities
✓ Updates for other entities

Suggested Checks:
---------------
1. Check entity-specific INSERT permissions
2. Verify required fields for this entity
3. Check for any entity-specific triggers or constraints
4. Verify data validation rules for this entity
`.trim();

      return formattedError;
    } catch (e) {
      return `Failed to format error. Raw error: ${JSON.stringify(error)}`;
    }
  }
}