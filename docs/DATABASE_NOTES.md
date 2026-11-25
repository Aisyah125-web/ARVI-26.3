# Database notes

## Schema consistency
`projects.location` is explicitly included in migration 001. Frontend code must use the same exact field names. If migrations are changed after execution, apply the new migration and refresh Supabase schema cache only when required; do not solve schema mismatch by silently renaming UI fields.

## Relations
`projects.user_id -> auth.users.id`  
`survey_points.project_id -> projects.id`  
`cross_sections.survey_point_id -> survey_points.id` (unique, one-to-one)  
`road_components.cross_section_id -> cross_sections.id`  
`survey_media.survey_point_id -> survey_points.id`  
`drawing_settings.cross_section_id -> cross_sections.id` (unique, one-to-one)

## Safe delete behavior
Foreign keys use `ON DELETE CASCADE` for dependent survey artifacts. Confirm deletion in UI and explain which children will be deleted. Storage objects require separate cleanup logic because database cascade does not delete Supabase Storage files.

## Apply migration
Use Supabase Dashboard → SQL Editor → New query, paste the migration file contents, Run. For a fresh project only. If any objects already exist, inspect current schema before rerunning; do not blindly drop production data.
